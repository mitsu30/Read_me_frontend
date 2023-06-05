// Googleを使ったログインを行い、ログイン成功後にユーザーをホームページにリダイレクトさせる機能。

// 新しいブラウザのポップアップウインドウを開き、その中でユーザーにGoogleとグインを行わせる関数。
// Googleに認証プロパイダを作成するためのクラス。
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
// Firebaseの認証機能を使用するためのオブジェクト
import { auth } from "../lib/initFirebase";

const loginWithGoogle = async () => {
  // Googleの認証プロパイダのインスタンスを作成している。
  const provider = new GoogleAuthProvider();
  // ポップアップ認証を行い、その結果を格納する。
  const result = await signInWithPopup(auth, provider);

  // 認証が成功した場合。
  if (result) {
    // ログインしたユーザー情報を取得する
    const user = result.user;
    // Google Access Tokenを取得している。Google APIを直接利用するための情報である。
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // ログイン成功後、ホームページにリダイレクト
    router.push("/");
    return user;
  }
};
