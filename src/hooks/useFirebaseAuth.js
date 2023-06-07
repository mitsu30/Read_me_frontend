import { useState, useEffect } from "react";
// Firebaseの認証情報が変わるたびにコールバック関数を呼び出すメソッド。
// 新しいブラウザのポップアップウインドウを開き、その中でユーザーにGoogleとグインを行わせる関数。
// Googleに認証プロパイダを作成するためのクラス。
import {
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../lib/initFirebase";

export default function useFirebaseAuth() {
  const [currentUser, setCurrentUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  // const loginWithGoogle = async () => {
  //   // Googleの認証プロパイダのインスタンスを作成している。
  //   const provider = new GoogleAuthProvider();
  //   const provider = new GithubAuthProvider();
  //   // ポップアップ認証を行い、その結果を格納する。
  //   const result = await signInWithPopup(auth, provider);
  
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
      const credential = GithubAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      // ユーザーから取得できる情報
      // displayName: string | null; // ユーザー表示名
      // email: string | null; // ユーザーメール
      // phoneNumber: string | null; // ユーザー電話番号
      // photoURL: string | null; // Googleプロフィール写真URL
      // uid: string; // Firebaseが生成するユニークID

            
      router.push("/");
      return { user, accessToken };
    }
  };
  
  const clear = () => {
    setCurrentUser(null);
    setLoading(false);
  };
  
  const logout = () => signOut(auth).then(clear);
  
  // コンポーネントがアンマウントされる時に認証状態のリスナーが削除されるようにする
  const nextOrObserver = async(user) => {
    if (!user) {
      setLoading(false);
      setCurrentUser(null);
    }
    
    setLoading(true);
    setCurrentUser(user);
    setLoading(false);
  };
  
  useEffect(() => {
    // Firebaseの認証状態が変わるたびに呼び出される。ユーザーがログインしていない場合はローディング状態を解除し、ログインしている場合はユーザー情報を更新する。
    const unsubscribe = onAuthStateChanged(auth, nextOrObserver);
    return unsubscribe;
  }, []);
  
  return {
    currentUser,
    loading,
    loginWithFirebase, 
    logout,
  };
}





