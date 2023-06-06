import { createContext, useContext } from "react";
import useFirebaseAuth from "../hooks/useFirebaseAuth";

export const AuthCtx = createContext();

// AuthContextProviderというコンポーネントを定義する。このコンポーネントは、全ての子コンポーネントに認証情報を提供する。
// valueプロパティにAuthContextを設定することで、全ての子コンポーネントからこの値がアクセス可能になる。
export function AuthContextProvider({ children }) {
  // useFirebaseAuthフックからcurrentUser、loading、loginWithGoogle、logoutという4つの値/関数を取得する。
  // 上で取得した4つの値/関数をAuthContextというオブジェクトにまとめる。
  const { currentUser, loading, loginWithFirebase, logout } = useFirebaseAuth();

  const AuthContext = {
    currentUser: currentUser,
    loading: loading,
    loginWithFirebase: loginWithFirebase,
    logout: logout,
  };
  
  return (
    <AuthCtx.Provider value={AuthContext}>
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuthContext = () => useContext(AuthCtx);
