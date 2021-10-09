import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonText,
} from "@ionic/react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { register } from "../config";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  let history = useHistory();

  async function Register() {
    const res = await register(email, password, confirm);
    res ? history.push("/") : alert("error");
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput
          placeholder="Email"
          onIonChange={(e: any) => setEmail(e.target.value)}
        />
        <IonInput
          type="password"
          placeholder="Password"
          onIonChange={(e: any) => setPassword(e.target.value)}
        />
        <IonInput
          type="password"
          placeholder="Confirm Password"
          onIonChange={(e: any) => setConfirm(e.target.value)}
        />
        <IonButton className="btn" onClick={Register}>
          Register
        </IonButton>

        <IonText>
          Already have an account? <Link to="/">Login</Link>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Register;
