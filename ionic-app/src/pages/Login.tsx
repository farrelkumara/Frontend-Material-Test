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
import { login } from "../config";
import { useHistory, Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  let history = useHistory();

  // async function Login() {
  //   const res = await login(email, password);
  //   res ? history.push("/Profile") : alert("error");
  // }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await login(data.email, data.password);
    res ? history.push("/Profile") : alert("error");
    // console.log(res);
    // alert(JSON.stringify(data));
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding content">
        <IonText> Email</IonText>
        <IonInput
          placeholder="Email"
          {...register("email", { required: true })}
          // onIonChange={(e: any) => setEmail(e.target.value)}
        />
        {errors.email && <p>Email is required</p>}
        <IonText> Password</IonText>
        <IonInput
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
          // onIonChange={(e: any) => setPassword(e.target.value)}
        />
        {errors.password && <p>Password is required</p>}
        <IonButton className="btn" onClick={handleSubmit(onSubmit)}>
          Login
        </IonButton>
        <IonText className="register">
          New here? <Link to="/register">Register</Link>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Login;
