import React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {RootState} from '../store';
import {IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/react'
import './TaskDetail.css';
import {Task} from '../store/tasks/types'

type Props = RouteComponentProps<{ id: string, tab: string}> & ReturnType<typeof mapStateToProps> & {
  goBack: () => void;
};

const TaskDetail: React.FunctionComponent<Props> = ({ tasks, match, goBack }) => {
  const task = tasks.find(s => s.id === parseInt(match.params.id, 10));

  if (!task) {
    return null;
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton goBack={goBack} defaultHref={`/${match.params.tab}`} />
          </IonButtons>
          <IonTitle>{task.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent padding class="task-detail task-page-list">
        <div>
          <img src={task.profilePic} alt={task.name}/>
        </div>
        <p>{task.login}</p>
        <p><strong>Address</strong>: {task.location}</p>
        <p><strong>Email</strong>: {task.email}</p>
        <p><strong>Phone</strong>: {task.phone}</p>
      </IonContent>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  tasks: state.tasks.tasks
});

export default connect(
  mapStateToProps
)(TaskDetail)
