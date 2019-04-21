import React, {Component} from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const POST_ARTICLE_MUTATION = gql`
    mutation postArticle($input: PostArticleInput!) {
        postArticle(input: $input) {
            title
            lead
            content
            imageUrl
            categories
        }
    }
`

class PostArticle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            lead: '',
            content: '',
            imageUrl: '',
            categories: []
        }
    }

    postArticle = async (mutation) => {
        console.log(this.state);
        await mutation({
            variables: {
                input: this.state
            }
        }).catch(console.error)

        this.props.history.replace('/');
    }

    // updateArticles = (cache, {data: {postAricle}}) => {
    //     var data = cache.readQuery({query: ROOT_QUERY});

    //     data.allArticles += 1
    //     data.allPhotos = [
    //         postAricle,
    //         ...data.allArticles
    //     ]
    //     cache.writeQuery({query: ROOT_QUERY}, data)
    // }

    render () {
        return(
            <form onSubmit={(e) => e.preventDefault()}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'
                }}>
                <h1>Post an article</h1>
                <input
                    type="text"
                    style={{margin: "10px"}}
                    placeholder="Article title"
                    value={this.state.title}
                    onChange={({target}) => this.setState({title: target.value})}
                />
                <input
                    type="text"
                    style={{margin: "10px"}}
                    placeholder="Article lead"
                    value={this.state.lead}
                    onChange={({target}) => this.setState({lead: target.value})}
                />
                <input
                    type="text"
                    style={{margin: "10px"}}
                    placeholder="Article image url"
                    value={this.state.imageUrl}
                    onChange={({target}) => this.setState({imageUrl: target.value})}
                />
                <select 
                    value={this.state.categories}
                    style={{margin: "10px"}}
                    onChange={({target}) => {
                        if(this.state.categories.indexOf(target.value) < 0) {
                            this.setState({
                                categories: this.state.categories.concat(target.value)
                            }, () => {
                                console.log(this.state)
                            })
                        } else {
                            console.log('Duplicated category');
                        }
                    }}
                    multiple>
                    <option value="Javascript">Javascript</option>
                    <option value="HTML5">HTML5</option>
                    <option value="CSS3">CSS3</option>
                    <option value="Java">Java</option>
                    <option value="GraphQL">GraphQL</option>
                    <option value="Node">Node</option>
                    <option value="React">React</option>
                    <option value="Redux">Redux</option>
                    <option value="Angular">Angular</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Microservices">Microservices</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Docker">Docker</option>
                </select>
                <textarea
                    type="text"
                    style={{margin: "10px"}}
                    placeholder="Article content"
                    value={this.state.content}
                    onChange={({target}) => this.setState({content: target.value})}
                    rows={25}
                    cols={150}
                />
                <div 
                    style={{
                        margin: "10px"
                    }}>
                    <button onClick={() => this.props.history.goBack()}>Cancel</button>
                    <Mutation 
                        mutation={POST_ARTICLE_MUTATION}>
                        {mutation => 
                            <button onClick={() => this.postArticle(mutation)}>Post</button>
                        }
                    </Mutation>
                </div>
            </form>
        )
    }
}

export default PostArticle;