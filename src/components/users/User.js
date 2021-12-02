import React, { Fragment, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/githubContext';

const SingleUser = ({ match }) => {
  const githubContext = useContext(GithubContext);

  const { getUserRepos, repos, getUser, user } = githubContext;
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    //eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    html_url,
    company,
    login,
    bio,
    blog,
    location,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  return (
    <Fragment>
      <Link to="/" className="btn btn-light">
        Back to search
      </Link>
      Hireable:{' '}
      {hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            className="round-img"
            style={{ width: '150px' }}
            alt={repos.name}
          />

          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h2>
                <strong>Bio: </strong>
              </h2>
              <p>{bio}</p>
              <a href={html_url} className="btn btn-dark my-1">
                {' '}
                Visit GitHub Profile
              </a>
            </Fragment>
          )}

          <ul>
            <li>
              <strong>Username: </strong> {login}
            </li>
            <li>
              <strong>Company: </strong> {company}
            </li>
            <li>
              <strong>Website: </strong> {blog}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-danger">Public_repos: {public_repos}</div>
        <div className="badge badge-dark">Public_gists : {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

export default SingleUser;
