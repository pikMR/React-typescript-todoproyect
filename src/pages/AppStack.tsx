import React from 'react';
import MapView from './Map';
import Login from './Login';
import { IonTabs, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonPage } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import UsersPage from "./UsersPage";
import TaskList from "./TaskList";
import TaskDetail from "./TaskDetail";
import UserDetail from "./UserDetail";

const AppStack: React.FC = () => (
  <IonPage>
    <Route exact path="/" render={() => <Redirect to="/users"/>}/>
    {
    /**
     * Only render exact matches.  Only destroy on back button click
     * On history.push keep previous route stored for back button
     *
     * TabBar does a push on iontabbutton click.
     * TabBar updates the tab links based on the current route path.
     */
    }

    <IonTabs>
      <IonRouterOutlet>
        <Route path="/:tab(users)" component={UsersPage} exact={true} />
        <Route path="/:tab(tasks)" component={TaskList} exact={true} />
        <Route path="/:tab(tasks)/task/:id" component={TaskDetail} />
        <Route path="/:tab(users|tasks)/users/:id" component={UserDetail} />
        <Route path="/:tab(map)" component={MapView} />
        <Route path="/:tab(login)" component={Login} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
      <IonTabButton tab="login" href="/login">
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
    </IonTabs>
  </IonPage>
);

export default AppStack;
