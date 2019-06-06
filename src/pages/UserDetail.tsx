import React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {RootState} from '../store';
import {IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/react';
import './UserDetail.css';

type Props = RouteComponentProps<{ id: string, tab: string }> & ReturnType<typeof mapStateToProps> & {
  goBack: () => void
};

const UserDetail: React.FC<Props> = ({ users, tasks, match, goBack }) => {
  const user = users.find(f => f.id === parseInt(match.params.id, 10));
  if (user == null) {
    return null;
  }
  const userTasks = tasks.filter(b => user.taskIds.indexOf(b.id) !== -1);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton goBack={goBack} defaultHref={`/${match.params.tab}`} />
          </IonButtons>
          <IonTitle>{user.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent padding class="user-detail">
        <div className="ion-text-center">
             <img src={user.pic} alt={user.pic}/>
        </div>
        <div>
          <p>{user.description}</p>

          <p className='tasks-list-title'>Found at these tasks:</p>

          {userTasks.map(task => (
            <h4 key={task.name}>
              {task.name}
            </h4>
          ))}

        </div>
      </IonContent>
    </>
  );
}

const mapStateToProps = (state: RootState) => ({
  users: state.users.users,
  tasks: state.tasks.tasks
});

export default connect(
  mapStateToProps
)(UserDetail)
