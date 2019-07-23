import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MultipleSelect from './MultipleSelect'
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import classNames from 'classnames';

const POST_ARTICLE_MUTATION = gql`
    mutation postArticle($input: PostArticleInput!) {
        postArticle(input: $input) {
            title
            lead
            content
            imageUrl
            categories {
                name
            }
        }
    }
`

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: "32px",
        paddingBottom: "32px",
        maxWidth: "900px",
        width: "100%"
    },
    paper: {
        padding: "32px"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "100%",
    },
    menu: {
        width: 200,
    },
    buttonsWrapper: {
        margin: "10px",
        position: "relative",
        width: "100%",
        height: "50px",
    },
    button: {
        color: "white",
        backgroundColor: "#0093ff",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",

        '&:hover': {
            backgroundColor: "#0093ff"
        }
    },
    "button--left": {
        left: 0
    },
    "button--right": {
        right: 0
    }
}));

const categories = [
    "Javascript",
    "HTML5",
    "CSS3",
    "Java",
    "GraphQL",
    "Node",
    "React",
    "Redux",
    "Angular",
    "Architecture",
    "Microservices",
    "DevOps",
    "Docker"
]

export default function PostArticle (props) {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        title: '',
        lead: '',
        content: '',
        imageUrl: '',
        categories: []
    })

    const handleChange = (name, e) => event => {
        const val = event && event.target ? event.target.value : e;
        setValues({ ...values, [name]: val });
    };


    const postArticle = async (mutation) => {
        await mutation({
            variables: {
                input: values
            }
        }).catch(console.error)

        props.history.replace('/');
    }

    return (
        <Container className={classes.container}>
            <Paper className={classes.paper}>
                <form onSubmit={(e) => e.preventDefault()}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start'
                    }}
                    noValidate autoComplete="off"
                >
                    <TextField
                        label="Title"
                        className={classes.textField}
                        value={values.title}
                        onChange={handleChange("title")}
                        margin="normal"
                        placeholder="Article title"
                    />
                    <TextField
                        label="Lead"
                        className={classes.textField}
                        value={values.lead}
                        onChange={handleChange("lead")}
                        margin="normal"
                        placeholder="Article lead"
                    />
                    <TextField
                        label="Image"
                        className={classes.textField}
                        value={values.imageUrl}
                        onChange={handleChange("imageUrl")}
                        margin="normal"
                        placeholder="Image url"
                    />
                    <MultipleSelect data={categories} updateParent={(e)=>{
                        //hak
                        handleChange("categories",e)()
                    }}/>

                    <TextField
                        label="Content"
                        className={classes.textField}
                        value={values.content}
                        onChange={handleChange("content")}
                        margin="normal"
                        placeholder="Article content"
                        multiline
                        rows="10"
                        rowsMax="50"
                        variant="outlined"
                    />

                    <div className={classes.buttonsWrapper}>
                        <Button 
                            className={classNames(classes.button, classes["button--left"])}
                            variant="contained" 
                            onClick={() => props.history.goBack()}>Cancel</Button>
                        <Mutation 
                            mutation={POST_ARTICLE_MUTATION}>
                            {mutation => 
                                <Button 
                                    className={classNames(classes.button, classes["button--right"])}
                                    variant="contained" 
                                    onClick={() => postArticle(mutation)}>Post</Button>
                            }
                        </Mutation>
                    </div> 
                </form>
            </Paper>
        </Container>
    )
}