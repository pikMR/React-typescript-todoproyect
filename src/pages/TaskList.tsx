import React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router';
import {RootState} from '../store';
import {History} from 'history';
import {
    IonIcon, IonMenuButton, IonCard, IonCardHeader, IonCardContent, IonItem, IonAvatar, IonList,
    IonGrid, IonCol, IonRow, IonButton, IonHeader, IonContent, IonToolbar, IonButtons, IonTitle
} from '@ionic/react';
import {Task} from '../store/tasks/types';
import {User} from '../store/users/types';


interface ItemProps {
    task: Task;
    taskUsers: User[];
    history: History;
}

const TaskItem = ({task, taskUsers, history}: ItemProps) => {
    function openTaskShare(task: Task) {
    }

    function openContact(task: Task) {
    }

    function goToLink(e: MouseEvent) {
        if (!e.currentTarget) {
            return;
        }
        e.preventDefault();
        history.push((e.currentTarget as HTMLAnchorElement).href);
    }

    return (
        <IonCard class="task-card">
            <IonCardHeader>
                <IonItem
                    button
                    detail={false}
                    href={`/tasks/task/${task.id}`}
                    onClick={goToLink}
                >
                    <IonAvatar slot="start">
                        <img src={process.env.PUBLIC_URL + task.profilePic} alt="Task profile pic"/>
                    </IonAvatar>
                    <strong>{task.name}</strong>
                </IonItem>
            </IonCardHeader>

            <IonCardContent class="outer-content">

                <IonItem button href={`/tasks/task/${task.id}`} onClick={goToLink}>
                    <h2>Login {task.name}</h2>
                </IonItem>
                <br/>

                <h2>This task stocks:</h2>

                <IonList>
                    {taskUsers.map(user => (
                        <IonItem
                            href={`/tasks/users/${user.id}`}
                            key={user.name}
                            onClick={goToLink}
                        >
                            <h3>{user.name}</h3>
                        </IonItem>
                    ))}
                </IonList>
            </IonCardContent>

            <IonRow no-padding justify-content-center>
                <IonCol text-left size="4">
                    <IonButton fill="clear" size="small" color="primary"
                               onClick={() => window.open(`https://www.twitter.com/${task.twitter}`, '_blank')}>
                        <IonIcon slot="start" name="logo-twitter"></IonIcon>
                        Tweet
                    </IonButton>
                </IonCol>
                <IonCol text-left size="4">
                    <IonButton fill="clear" size="small" color="primary" onClick={() => openTaskShare(task)}>
                        <IonIcon slot="start" name='share-alt'></IonIcon>
                        Share
                    </IonButton>
                </IonCol>
                <IonCol text-left size="4">
                    <IonButton fill="clear" size="small" color="primary" onClick={() => openContact(task)}>
                        <IonIcon slot="start" name='chatboxes'></IonIcon>
                        Contact
                    </IonButton>
                </IonCol>
            </IonRow>
        </IonCard>
    );
};

type ListProps = RouteComponentProps & ReturnType<typeof mapStateToProps>;

const TaskList = ({tasks, users, history}: ListProps) => (
    <>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton></IonMenuButton>
                </IonButtons>
                <IonTitle>Taskes</IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent class="outer-content task-list">
            <IonList>
                <IonGrid fixed>
                    <IonRow align-items-stretch>
                        {tasks.map((task) =>
                            <IonCol size="12" size-md="6" key={task.id}>
                                <TaskItem
                                    task={task}
                                    history={history}
                                    taskUsers={users.filter(user => user.taskIds.indexOf(task.id) !== -1)}
                                />
                            </IonCol>
                        )}
                    </IonRow>
                </IonGrid>
            </IonList>
        </IonContent>
    </>
);

const mapStateToProps = (state: RootState) => ({
    tasks: state.tasks.tasks,
    users: state.users.users
});

export default connect(
    mapStateToProps
)(TaskList);
