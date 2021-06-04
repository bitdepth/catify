/* eslint-disable react-hooks/exhaustive-deps */
/** @jsxImportSource theme-ui */ 
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Button, Flex, Box, AspectImage, Alert, Container, Spinner, Text, Card} from 'theme-ui';
import { useToasts } from 'react-toast-notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faHeart } from '@fortawesome/free-solid-svg-icons';
import {Tiles} from '@rebass/layout';
import {listCats, voteCat, getVotes, favouriteCat, unfavouriteCat, getFavourites} from '../api';
import {groupBy} from 'lodash';

function List () {

    const [cats, setCats] = useState([]);
    const [votes, setVotes] = useState({});
    const [favourites, setFavourites] = useState({});

    const [catsInflight, setCatsInflight] = useState(true);
    const { addToast } = useToasts();

    const tallyVotes = (votes) => {
        let tally = {}; 
        Object.keys(votes).forEach(imgId => {
            tally[imgId] = votes[imgId].reduce((total, vote) => {
                if(vote.value === 1) {
                    return total + 1
                }
                return total - 1
            }, 0);
        })

        return tally;
    }

    const fetchCats = async () => {
        
        try {
            const votes = await getVotes();
            setVotes(tallyVotes(groupBy(votes, 'image_id')));
        } catch (err) {
            addToast('Something went wrong retrieving votes', {
                appearance: 'error',
                autoDismiss: true,
              })
        }

        try {
            const favourites = await getFavourites(localStorage.getItem('CAT_SUB_ID'));
            setFavourites(groupBy(favourites, 'image_id'));
        } catch (err) {
            addToast('Something went wrong retrieving favourites', {
                appearance: 'error',
                autoDismiss: true,
              })
        }

        try {
            setCatsInflight(true);
            const catList = await listCats();
            setCats(catList);
            setCatsInflight(false);
        } catch (err) {
            setCatsInflight(false);
            addToast('Something went wrong retrieving cats', {
                appearance: 'error',
                autoDismiss: true,
              })
        }
    }

    useEffect(() => {
        fetchCats();
    }, [])

    const handleVote = async (id, vote) => {
        try {
            addToast('Submitting request', {
                appearance: 'info',
                autoDismiss: true,
                autoDismissTimeout: 2000
              })
            await voteCat(id, vote);
            fetchCats();
        } catch (err) {
            addToast('Something went wrong voting', {
                appearance: 'error',
                autoDismiss: true,
              })
        }
    }

    const handleFavourite = async (id) => {
        try {
            addToast('Submitting request', {
                appearance: 'info',
                autoDismiss: true,
                autoDismissTimeout: 2000
              })
            await favouriteCat(id, localStorage.getItem('CAT_SUB_ID'));
            fetchCats();
        } catch (err) {
            addToast('Something went wrong favouriting the cat', {
                appearance: 'error',
                autoDismiss: true,
              })
        }
    }

    const handleUnfavourite = async (imgId) => {
        try {
            addToast('Submitting request', {
                appearance: 'info',
                autoDismiss: true,
                autoDismissTimeout: 2000
              })
            const favId = favourites[imgId][0].id;
            await unfavouriteCat(favId);
            fetchCats();
        } catch (err) {
            addToast('Something went wrong unfavouriting the cat', {
                appearance: 'error',
                autoDismiss: true,
              })
        }
    }

    return (
        <Container sx={{
            maxWidth: 1280,
            padding: [1, 2, 4]
        }}>
            {(!cats.length && !catsInflight) && <Alert mx="auto" variant='secondary' mb={2}>There are no cat images to display please try <Link to="/upload">uploading</Link> some</Alert>}

        <Button mx="auto" onClick={fetchCats} sx={{
                backgroundColor: 'secondary',
                marginBottom: 4
            }}>Refresh cat images</Button>
            {catsInflight && (
                <Flex sx={{
                    justifyContent:'center'
                }}>
                    <Spinner size={100} />
                </Flex>
            )}
  
        <Tiles columns={[1, 2, 4]}>
        {cats.map(cat => (
            <Card key={cat.id} variant="secondary" sx={{
                position: 'relative',
                backgroundColor: 'background',
                p: 2,
                borderRadius: 2,
                boxShadow: '0 0 10px rgba(255, 255, 255, .5)',
                border: '3px dashed',
                borderColor: 'secondary'
            }}>
                <Box sx={{
                    height: '200px',
                    overflow: 'hidden',
                    mb: 2,
                }}>
                    <AspectImage ratio={4 / 3} src={cat.url} />
                </Box>
              <Button sx={{
                  top: 2,
                  position:'absolute',
                  right: 2,
                  backgroundColor: 'secondary',
                  color: Object.keys(favourites).includes(cat.id) ? '#ff6868' : 'white'
              }}variant="secondary" type="button" onClick={() => Object.keys(favourites).includes(cat.id) ? handleUnfavourite(cat.id) : handleFavourite(cat.id)}>
                <FontAwesomeIcon icon={faHeart} />
              </Button>
              <Flex sx={{
                  justifyContent: 'space-between'
              }}>
              <Button aria-label="thumbs up" variant="primary" type="button" onClick={() => handleVote(cat.id, 1)}>
                <FontAwesomeIcon icon={faThumbsUp} />
              </Button>
              <Text>Votes: {votes[cat.id]}</Text>
              <Button aria-label="thumbs up" variant="primary" type="button" onClick={() => handleVote(cat.id, 0)}>
                <FontAwesomeIcon icon={faThumbsDown} />
              </Button>
              </Flex>
            </Card>
        ))}
        </Tiles>
        </Container>
    )
}

export default List;