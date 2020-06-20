/* Core Package */
import React, { useState, useEffect } from 'react';

/* Utilites */
import {
    H1,
    List,
    ListItem,
    Button,
    Container,
} from '@ingresse/aphrodite';

/* Component Itself */
export default function App() {
    const [ repositories, setRepositories ] = useState([]);

    /*Fetch api*/
    useEffect(() => {
        async function fetchData () {
            const response = await fetch('https://api.github.com/users/oliveira-ana/repos')
            const data = await response.json();

            setRepositories(data);
        }
        fetchData();
    }, []);

    /* Did Update */
    useEffect(() => {
        const filtered = repositories.filter(repo => repo.favorite);
        document.title = `Você tem ${filtered.length} favoritos`;
    }, [repositories]);

    /* Handle id */
    function handleFavorite(id) {
        const newRepositories = repositories.map(repo => {
            return repo.id === id ? {...repo, favorite:!repo.favorite} : repo
        });

        setRepositories(newRepositories);
    }

    /* render */
    return (
        <Container center>
            <H1 center> Meus Repositórios</H1>
            <List>
                {repositories.map(repo =>(
                    <ListItem key={repo.id}>
                        {repo.name}
                        {repo.favorite && <span>(Favorito)</span>}
                        <Button
                            link
                            onClick={() => handleFavorite(repo.id)}>
                            Favoritar
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}
