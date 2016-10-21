import React    from 'react';
import {Button} from 'react-bootstrap';

export default class Home extends React.Component {
    constructor( props, context ) {
        super(props, context);

        this.state = {
            profile: props.auth.getProfile()
        };

        props.auth.on('profile_updated', newProfile => {
            this.setState({
                profile: newProfile
            });
        });
    }

    logout() {
        this.props.auth.logout();
        this.context.router.push('/login');
    }

    render() {
        const {profile} = this.state;

        return (
            <div className='HomePage'>
                <h1>Welcome, {profile.nickname}!</h1>

                <p>
                    <b> Your account created at: </b> {profile.created_at} <br/>
                    <b> Your email: </b> {profile.email} <br/>
                    <b> Last update: </b > {profile.updated_at} <br/>
                </p>

                <Button onClick={this.logout.bind(this)}>
                    Logout
                </Button>
            </div>
        );
    }
}

Home.contextTypes = {
    router: React.PropTypes.object
};