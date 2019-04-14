import React from 'react';
import { Query } from 'react-apollo';
import { ROOT_QUERY } from './App';

const Articles = () => 
    <Query query={ROOT_QUERY}> 
        {({loading, data}) => loading ? 
        <p>Loading...</p> :
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
        }
    </Query>

export default Articles;