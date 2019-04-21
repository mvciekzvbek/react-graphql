import React from 'react';
import { Query } from 'react-apollo';
import { ROOT_QUERY } from './App';
import { gql } from 'apollo-boost';
import { withApollo } from 'react-apollo';


// const ALL_ARTICLES_QUERY = gql`
//     query allArticles($filter: ArticleFilter $page: DataPage $sort: DataSort) {
//         allArticles(filter: $filter paging: $page sorting: $sort) {
//             id
//             title
//             lead
//             url
//             imageUrl
//             categories
//             postedBy {
//                 githubLogin
//             }
//             created
//         }
//     }
// `
class Articles extends React.Component {
    state = {
        filter: {
        },
        page: {
            first: 2,
            start: 0
        },
        sort: {}
    }

    constructor(props) {
        super(props)
    }

    render () {
        const {client} = this.props;

        return(
            <Query query={ROOT_QUERY} variables={this.state}> 
                {({loading, data}) => loading ? 
                    <p>Loading...</p> :
                    <div>
                        <ul>
                            {data.allArticles.map(article => 
                                <li key={article.id}>
                                    <a href={article.url}>
                                        <div>
                                            <p>{article.title}</p>
                                            <p>{article.lead}</p>
                                            <p>{article.categories.join(',')}</p>
                                            <img src={article.imageUrl} width={200}/>
                                            <p>{article.postedBy.githubLogin}</p>
                                            <p>{article.created}</p>
                                        </div>
                                    </a>
                                </li>
                            )}
                        </ul>
                        <button
                            onClick = {async () => {
                                const prev = this.state;
                                const next = {
                                    ...prev,
                                    page: {
                                        first: 2,
                                        start: prev.page.start - 2,
                                    }
                                }
                                this.setState(next)
                                const {data} = await client.query({
                                    query: ROOT_QUERY,
                                    variables: this.state
                                })
                            }}>Previous</button>
                        <button 
                            onClick={ async () => {
                                const prev = this.state;
                                const next = {
                                    ...prev,
                                    page: {
                                        first: 2,
                                        start: prev.page.start + 2.
                                    }
                                }
                                this.setState(next)
                                const {data} = await client.query({
                                    query: ROOT_QUERY,
                                    variables: this.state
                                })}}>Next</button>
                    </div>
                }
            </Query>
        )
    }
}

export default withApollo(Articles);