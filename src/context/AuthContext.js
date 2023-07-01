import { createContext, useContext,  useState, useEffect  } from "react";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import axios from "axios";
import nookies from "nookies";


export const AuthCtx = createContext();

// AuthContextProviderというコンポーネントを定義する。このコンポーネントは、全ての子コンポーネントに認証情報を提供する。
// valueプロパティにAuthContextを設定することで、全ての子コンポーネントからこの値がアクセス可能になる。
export function AuthContextProvider({ children }) {
  // useFirebaseAuthフックからcurrentUser、loading、loginWithGoogle、logoutという4つの値/関数を取得する。
  // 上で取得した4つの値/関数をAuthContextというオブジェクトにまとめる。
  const { currentUser, loading, loginWithFirebase, logout } = useFirebaseAuth();
  const [userAvatar, setUserAvatar] = useState(null);
  const [isStudent, setIsStudent] = useState(false);
  
  useEffect(() => {
    const cookies = nookies.get(null);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${cookies.token}`,
      },
    };

    if (currentUser) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/mypages/avatar`, config)
        .then((data) => {
          setUserAvatar(data.data.data.avatar_url);
          setIsStudent(data.data.data.is_student); 
        });
    }
  }, [currentUser]);

  const AuthContext = {
    currentUser: currentUser,
    loading: loading,
    loginWithFirebase: loginWithFirebase,
    logout: logout,
    isStudent: isStudent, 
  };
  
  return (
    <AuthCtx.Provider value={{ AuthContext, userAvatar }}>
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuthContext = () => useContext(AuthCtx);
