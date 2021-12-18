import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { heroesFetching, heroesFetched, heroesFetchingError, heroDelete } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';
// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {heroes, activeFilter, heroesLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const onDelete = (id) => {
        const heroesWithoutOneHero = heroes.filter(item => item.id !== id);
        dispatch(heroDelete(heroesWithoutOneHero))

        /* request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .catch(() => dispatch(heroesFetchingError())) */
    }

    const filteredData = (items, filter) => {
        if (filter === 'all') {
            return items
        } else {
            return items.filter(item => item.element === filter)
        }
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return filteredData(arr, activeFilter).map(({id, ...props}) => {
            return (
                <CSSTransition timeout={400} classNames="card" key={id}>
                    <HeroesListItem onDelete={() => onDelete(id)} key={id} {...props}/>
                </CSSTransition>                    
            )
        })
    }

    const elements = renderHeroesList(heroes);

    return (
        <TransitionGroup component='ul'>
            {elements}
        </TransitionGroup> 
    )
}

export default HeroesList;