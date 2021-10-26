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
import { regis } from "../config";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendPasswordResetEmail } from "@firebase/auth";

type Inputs = {
  email: string;
  password: string;
  confirm: string;
};

const Register: React.FC = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirm, setConfirm] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  let history = useHistory();

  // async function Register() {
  //   const res = await register(email, password, confirm);
  //   res ? history.push("/") : alert("error");
  // }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await regis(data.email, data.password, data.confirm);
    res ? history.push("/") : alert("error");
  };
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
          {...register("email", {
            required: "Email must be filled out",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "This is not a valid email",
            },
          })}
          //onIonChange={(e: any) => setEmail(e.target.value)}
        />
        <p>{errors.email?.message}</p>
        <IonInput
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password must be filled out",
            minLength: {
              value: 6,
              message: "Password must have at least 6 characters",
            },
          })}
          //onIonChange={(e: any) => setPassword(e.target.value)}
        />
        <p>{errors.password?.message}</p>
        <IonInput
          type="password"
          placeholder="Confirm Password"
          {...register("confirm", {
            required: "Confirm Password must be filled out",
            validate: {},
          })}
          //onIonChange={(e: any) => setConfirm(e.target.value)}
        />
        <p>{errors.confirm?.message}</p>
        <IonButton className="btn" onClick={handleSubmit(onSubmit)}>
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
