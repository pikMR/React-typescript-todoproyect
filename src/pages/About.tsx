import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RootState} from '../store';
import {IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPopover, IonTitle, IonToolbar} from '@ionic/react';
import './About.css';
import AboutPopover from '../components/AboutPopover';
import { IonInput, IonItem, IonLabel,IonToast, IonRow, IonCol, IonAlert, IonModal } from '@ionic/react';

type Props = ReturnType<typeof mapStateToProps>

type State = {
    showPopover: boolean,
    showPopoverEvent: null | MouseEvent,
    isLogin: boolean,
    btnText: string,
    signup: string,
    email: string;
    emailValid: boolean,
    emailError: string,
    pass: string,
    passValid: boolean,
    passError: string,
    submitted: boolean,
    showToast: boolean,
    showAlert:boolean,
    showModal:boolean
}

class About extends Component<Props, State> {

  constructor(props: Props) {
      super(props);

      this.state = {
          isLogin: false,
          btnText: 'Sign in',
          signup: "Don't have an account yet? Sign up.",
          email: "",
          emailValid: true,
          emailError: "",
          pass: "",
          passValid: true,
          passError: "",
          submitted: false,
          showPopover: false,
          showPopoverEvent: null,
          showToast:false,
          showAlert : false,
          showModal: false
      };
  }

  password = (e: CustomEvent) => {
      let valor : string = e.detail.value;
        this.setState(() => ({
            pass: valor
        }));
  }

  presentPopover = (e: MouseEvent) => {
        this.setState(() => ({
            showPopover: true,
            showPopoverEvent: e
        }));
    };

    dismissPopover = () => {
        this.setState(() => ({
            'showPopover': false,
            'showPopoverEvent': null
        }));
    };

  emailChange = (e: CustomEvent) => {
    let valor : string = e.detail.value;
    let mailmessage : string = this.validateEmail(valor);
    this.setState(() => ({
        email: valor,
        emailError: mailmessage,
        emailValid: (mailmessage === "")
    }));
  }

  validateEmail = (email : string) => {
    if (email) {
        if (/[a-z]+@[a-z]+\.[a-z]+/.test(email)) {
            return "";
        } else {
            return "Invalid email";
        }
    } else {
        return "Email required";
    }
}

validatePass = (pass:string) => {
    if (pass) {
        if (pass.length < 6) {
            return 'At least 6 characters required';
        } else {
            return "";
        }
    } else {
        return 'Password required';
    }
}

submit = (event:Event) => {
    const state = this.state;
    const passResult = this.validatePass(state.pass);
    let pwvalid = false;
    event.preventDefault();

    if(passResult === ""){
      pwvalid = true;
    }

    if (state.emailValid && pwvalid) {
      this.setState({
          submitted: true,
          showAlert:false,
          showModal:true,
          passValid: pwvalid,
          passError: passResult
      });

      //  mobiscroll.toast({ message: (state.isLogin ? 'Login' : 'Signup') + ' success!'});
    } else {
      this.setState({
          submitted: false,
          showAlert: true,
          showModal:false,
          passValid: pwvalid,
          passError: passResult
      });
    }
}

    render() {
        return (
            <>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>Acceso</IonTitle>
                        <IonButtons slot="end">
                            <IonButton icon-only onClick={this.presentPopover}>
                                <IonIcon slot="icon-only" name="more"></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonPopover
                    isOpen={this.state.showPopover}
                    event={this.state.showPopoverEvent}
                    onDidDismiss={this.dismissPopover}
                >
                    <AboutPopover
                        dismissPopover={this.dismissPopover}
                    />
                </IonPopover>
                <IonAlert
  isOpen={this.state.showAlert}
  onDidDismiss={() => this.setState(() => ({ showAlert: false }))}
  header={'Alert'}
  subHeader={'Acceso incorrecto'}
  message={this.state.emailValid ? this.state.passError : this.state.emailError}
  buttons={['OK']}
>
</IonAlert>
    <IonModal
        isOpen={this.state.showModal}
        onDidDismiss={() => this.setState(() => ({ showModal: false }))}
      >

      <div className="centerModal">
      <IonRow align-items-end>
      <IonCol>
          <IonButton expand="block" fill="outline">Fichar</IonButton>
      </IonCol>
      <IonCol align-self-start>
      </IonCol>
      <IonCol>
          <IonButton expand="block" fill="outline">Ver Tareas</IonButton>
      </IonCol>
      <IonCol>
      </IonCol>
    </IonRow>
    </div>


        <IonButton onClick={() => this.setState(() => ({ showModal: false }))}>
          Close Modal
        </IonButton>
      </IonModal>
                <IonContent>
                {/*-- Input with placeholder --*/}
                    <IonRow>
                      <IonCol align-self-center>
                      <IonInput placeholder="Email" value={this.state.email} onIonChange={this.emailChange}></IonInput>
                      <IonInput placeholder="Contraseña" value={this.state.pass} type="password" onIonChange={this.password}>
                      </IonInput>
                      </IonCol>
                    </IonRow>
                    <IonButton size="small" expand="block" fill="outline" onClick={this.submit}>Autenticación</IonButton>

                    <div className="ion-padding about-info">
                        <h4>Steve's User Emporium</h4>

                        <p>
                            We are specialists in Freshwater Tropical and Tropical Marine. We are also suppliers of pond products, aquariums and viviariums.
                            <br/> <br/>
                            We are one of the largest aquatic emporiums in London, and we pride our selves in 1 to 1 service and try to give the best possible advice to each customer
                            from beginner to experienced. We will always give a warm and friendly welcome to anyone who walks through the door!
                            <br/> <br/>
                            Please come to one of our branches to view our vast array of tropical and marine livestock.
                            We house a large selection of tropical and marine User including a large selection of corals and invertebrates and freshwater User.
                        </p>
                    </div>
                </IonContent>
            </>
        );
    }
}

const mapStateToProps = (state: RootState) => ({});

export default connect(
    mapStateToProps
)(About);
