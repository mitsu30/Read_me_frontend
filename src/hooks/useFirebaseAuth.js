import { useState, useEffect } from "react";
import nookies from "nookies";
// Firebaseの認証情報が変わるたびにコールバック関数を呼び出すメソッド。
// 新しいブラウザのポップアップウインドウを開き、その中でユーザーにGoogleとグインを行わせる関数。
// Googleに認証プロパイダを作成するためのクラス。
import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  onIdTokenChanged,
  getAdditionalUserInfo,
} from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../lib/initFirebase";
import { useSnackbar } from 'notistack';

export default function useFirebaseAuth() {
  const [currentUser, setCurrentUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar(); 
  const router = useRouter();

  const AUTO_LOGOUT_TIME = 15 * 60 * 1000;
  let autoLogoutTimer;

  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(autoLogoutTimer);
      autoLogoutTimer = setTimeout(logout, AUTO_LOGOUT_TIME);
    };

    window.addEventListener('click', resetTimer);
    window.addEventListener('keypress', resetTimer);

    return () => {
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('keypress', resetTimer);
    };
  }, []);

  // useEffect(() => {
  //   const handleBeforeunload = () => logout();

  //   window.addEventListener('beforeunload', handleBeforeunload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeunload);
  //   };
  // }, []);
  
  const getProvider = (method) => {
    switch (method) {
      case "google":
        return new GoogleAuthProvider();
      case "github":
        return new GithubAuthProvider();
    }
  };

  const loginWithFirebase = async (method) => {
    const getResult = () => {
        return signInWithPopup(auth, getProvider(method));
    };

    const result = await getResult();

    if (result) {
      const user = result.user;
      const details = getAdditionalUserInfo(result);
      console.log(result);
      console.log(details);

      return { user, details };
    }
  };
  
  const clear = () => {
    setCurrentUser(null);
    setLoading(false);
    enqueueSnackbar('ログアウトしたよ！', { variant: 'success' });
    router.push("/");
  };
  
  const logout = () => signOut(auth).then(clear);
  
  // コンポーネントがアンマウントされる時に認証状態のリスナーが削除されるようにする
  const nextOrObserver = async(user) => {
    if (!user) {
      setLoading(false);
      setCurrentUser(null);
      nookies.set(undefined, "token", "", { path: "/" });
      return;
    }
    
    setLoading(true);
    const token = await user.getIdToken();
    setCurrentUser(user);
    nookies.set(undefined, "token", token, { path: "/" });
    setLoading(false);
  };
  
  // FirebaseのIDトークンが変わるたびに呼び出される。ユーザーがログインしていない場合はローディング状態を解除し、ログインしている場合はユーザー情報を更新する。
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, nextOrObserver);
    return unsubscribe;
  }, []);

  // 60分ごとに指定した処理を実行するタイマーを作成している。その処理の中で、現在ログインしているユーザーのIDトークンを取得し直す.コンポーネントがアンマウントされるときにクリーンアップ関数が実行され、タイマーが解除される.
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 60 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  return {
    currentUser,
    loading,
    loginWithFirebase, 
    logout,
  };
}





