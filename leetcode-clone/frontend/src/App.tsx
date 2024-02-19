import './App.css';
import { Landing } from './components/Landing';
import { initializeApp } from "firebase/app";
import {app} from "./utils/firebase";
import { Signin } from './components/signin';
import { getAuth , onAuthStateChanged} from 'firebase/auth';
import { useEffect } from 'react';
import { useSetRecoilState , useRecoilState, RecoilRoot} from 'recoil';
import { userAtom } from './store/atoms/user';


export const auth = getAuth(app);
function App() {
  return <RecoilRoot>
    <StoreApp />
  </RecoilRoot>
  
}

function StoreApp() {
  const [user, setUser] = useRecoilState(userAtom);
  useEffect(() => {
    onAuthStateChanged(auth, function(user) {
      if (user && user.email) {
        setUser({
          loading: false,
          user : {
            email :user.email
          }

        })
      } else {
        setUser({loading:false});
        // No user is signed in.
        console.log('There is no logged in user');
      }
    });

  },[]);
  if (user.loading){
    return <div>loading...</div>
  }
  if (!user.user){ 
    return <div><Signin/></div>
  }
  return (
      <>

      You are logged in as {user.user?.email}
        
        
      </>
  )

}

export default App
