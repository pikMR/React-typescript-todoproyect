import React, { Component } from 'react';
import { IonIcon, IonTabs, IonTab, IonTabBar, IonTabButton, IonLabel } from '@ionic/react';

// no se usa.
export default class Tabs extends Component {
  render() {
    return (
      <IonTabs>
        <IonTab tab="users">User Content2</IonTab>
        <IonTab tab="tasks">Tasks Content2</IonTab>
        <IonTab tab="map">Map Content2</IonTab>
        <IonTab tab="login">Login Content2</IonTab>

        <IonTabBar slot="bottom">
        <IonTabButton tab="login">
          <IonLabel>Acceso2</IonLabel>
          <IonIcon name="login"></IonIcon>
        </IonTabButton>
          <IonTabButton tab="users">
            <IonLabel>Usuarios2</IonLabel>
            <IonIcon name="users"></IonIcon>
          </IonTabButton>
          <IonTabButton tab="tasks">
            <IonLabel>Mi Perfil2</IonLabel>
            <IonIcon name="tasks"></IonIcon>
          </IonTabButton>
          <IonTabButton tab="map">
            <IonLabel>Mapa2</IonLabel>
            <IonIcon name="map"></IonIcon>
          </IonTabButton>

        </IonTabBar>
      </IonTabs>
    );
  }
}
