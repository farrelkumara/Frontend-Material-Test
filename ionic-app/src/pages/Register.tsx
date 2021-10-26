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
import * as yup from "yup";
import { sendPasswordResetEmail } from "@firebase/auth";

type Inputs = {
  email: string;
  password: string;
  confirm: string;
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email must be filled out")
    .email("This is not a valid email"),
  password: yup
    .string()
    .required("Password must be filled out")
    .min(6, "Password must be at least 6 characters"),
  confirm: yup
    .string()
    .required("Confirm Password must be filled out")
    .oneOf([yup.ref("password"), null], "Confirm Password does not match"),
});

const Register: React.FC = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirm, setConfirm] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

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
          {...register("email")}
          //onIonChange={(e: any) => setEmail(e.target.value)}
        />
        <p>{errors.email?.message}</p>
        <IonInput
          type="password"
          placeholder="Password"
          {...register("password")}
          //onIonChange={(e: any) => setPassword(e.target.value)}
        />
        <p>{errors.password?.message}</p>
        <IonInput
          type="password"
          placeholder="Confirm Password"
          {...register("confirm")}
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
