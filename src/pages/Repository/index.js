import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  GoIssueOpened,
  GoIssueClosed,
  GoChevronLeft,
  GoChevronRight,
} from 'react-icons/go';
import api from '../../services/api';

import Container from '../../components/Container';
import { Label, Loading, Owner, IssueList, Menu, Button } from './styles';

export default class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    loading: true,
    loadingIssues: true,
    issuesState: 'open',
    repoName: '',
    page: 1,
    full: false,
  };

  async componentDidMount() {
    const { match } = this.props;

    this.setState({
      repoName: await decodeURIComponent(match.params.repository),
    });

    const { repoName } = this.state;

    const [repository] = await Promise.all([
      api.get(`/repos/${repoName}`),
      this.loadIssues(),
    ]);

    this.setState({
      repository: repository.data,
      loading: false,
    });
  }

  changeIssuesState = async newState => {
    await this.setState({
      issuesState: newState,
      page: 1,
    });
    await this.loadIssues();
  };

  changeIssuesPage = async page => {
    await this.setState({
      page,
    });
    await this.loadIssues();
  };

  loadIssues = async () => {
    this.setState({ loadingIssues: true });

    const { issuesState, repoName, page } = this.state;

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: issuesState,
        per_page: 5,
        page,
      },
    });

    this.setState({
      issues: issues.data,
      loadingIssues: false,
      full: !(issues.data.length > 0),
    });
  };

  render() {
    const {
      repository,
      issues,
      loading,
      loadingIssues,
      issuesState,
      page,
      full,
    } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <Menu>
          <div>
            <p>Quais issues?</p>
            <div>
              <Button
                disabled={loadingIssues || issuesState === 'open'}
                onClick={() => this.changeIssuesState('open')}
              >
                <GoIssueOpened size="20" color="#fff" />
                Abertas
              </Button>
              <Button
                disabled={loadingIssues || issuesState === 'closed'}
                onClick={() => this.changeIssuesState('closed')}
              >
                <GoIssueClosed size="20" color="#fff" />
                Fechadas
              </Button>
              <Button
                disabled={loadingIssues || issuesState === 'all'}
                onClick={() => this.changeIssuesState('all')}
              >
                Todas
              </Button>
            </div>
          </div>
          <div>
            <p>{`Pagina: ${page}`}</p>
            <div>
              <Button
                disabled={loadingIssues || page === 1}
                onClick={() => this.changeIssuesPage(page - 1)}
              >
                <GoChevronLeft size="20" color="#fff" />
                Anterior
              </Button>
              <Button
                disabled={loadingIssues || full === true}
                onClick={() => this.changeIssuesPage(page + 1)}
              >
                Proxima
                <GoChevronRight size="20" color="#fff" />
              </Button>
            </div>
          </div>
        </Menu>
        {!loadingIssues ? (
          <IssueList>
            {issues.map(issue => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <div>
                    {issue.state === 'open' ? (
                      <GoIssueOpened size="20" color="#28a745" />
                    ) : (
                      <GoIssueClosed size="20" color="#cb2431" />
                    )}
                    <strong>
                      <a href={issue.html_url}>{issue.title}</a>
                      {issue.labels.map(label => (
                        <Label color={label.color} key={String(label.id)}>
                          {label.name}
                        </Label>
                      ))}
                    </strong>
                  </div>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))}
          </IssueList>
        ) : (
          <div>Carregando...</div>
        )}
      </Container>
    );
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};
