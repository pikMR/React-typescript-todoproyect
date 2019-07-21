import React from 'react';
import MapView from './Map';
import Login from './Login';
import {connect} from 'react-redux';
import {RootState} from '../store';
import { IonTabs, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonPage } from '@ionic/react';
import { Route, Redirect,RouteComponentProps, withRouter } from 'react-router';
import UsersPage from "./UsersPage";
import TaskList from "./TaskList";
import TaskDetail from "./TaskDetail";
import UserDetail from "./UserDetail";

type Props = RouteComponentProps & ReturnType<typeof mapStateToProps>
& {goBack:() => void};

const AppStack = ({accounts} : Props) =>{
  const login = (accounts.length > 0);
  let rol;
  if(login){
    rol = accounts[0].rol ;
  }
  return (
      <IonPage>
        <Route exact path="/" render={() => <Redirect to="/users"/>}/>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/:tab(users)" component={UsersPage} exact={true} />
            <Route path="/:tab(tasks)" component={TaskList} exact={true} />
            <Route path="/:tab(tasks)/task/:id" component={TaskDetail} />
            <Route path="/:tab(users|tasks)/users/:id" component={UserDetail} />
            <Route path="/:tab(map)" component={MapView} />
            <Route path="/:tab(login)" component={Login} />
          </IonRouterOutlet>
            {
              // no comentar dentro de los condicionales! login?...
              (rol=="admin")?(
                <IonTabBar slot="bottom">
                  <IonTabButton tab="login" href="/login" disabled={true}>
                    <IonIcon name="information-circle" />
                    <IonLabel>Login</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="users" href="/users">
                    <IonIcon name="sunny" />
                    <IonLabel>Usuarios</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="tasks" href="/tasks">
                    <IonIcon name="planet" />
                    <IonLabel>Perfil</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="map" href="/map">
                    <IonIcon name="map" />
                    <IonLabel>Map</IonLabel>
                  </IonTabButton>
                </IonTabBar>
            ):(rol=="user")?(
              <IonTabBar slot="bottom">
                <IonTabButton tab="login" href="/login" disabled={true}>
                  <IonIcon name="information-circle" />
                  <IonLabel>Login</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tasks" href="/tasks">
                  <IonIcon name="sunny" />
                  <IonLabel>Tareas Asignadas</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tasks" href="/tasks">
                  <IonIcon name="planet" />
                  <IonLabel>Perfil</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tasks" href="/tasks">
                  <IonIcon name="map" />
                  <IonLabel>Fichar</IonLabel>
                </IonTabButton>
              </IonTabBar>
            ):(
              <IonTabBar slot="bottom">
                  <IonTabButton tab="login" href="/login">
                  </IonTabButton>
                  <IonTabButton tab="tasks" href="/tasks">
                  </IonTabButton>
                  <IonTabButton tab="login" href="/login">
                    <IonIcon name="information-circle" />
                    <IonLabel>Login</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="users" href="/users">
                  </IonTabButton>
                  <IonTabButton tab="map" href="/map">
                  </IonTabButton>
              </IonTabBar>
            )
            }
        </IonTabs>
      </IonPage>
  );
}


const mapStateToProps = (state: RootState) => ({
  accounts: state.account.accounts
});

export default connect(
  mapStateToProps
)(AppStack)
