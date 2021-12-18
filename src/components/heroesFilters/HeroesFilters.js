import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { chosenActiveFilter, filtersFetching, filtersFetched, filtersFetchingError } from '../../actions';
import {useHttp} from '../../hooks/http.hook';
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const {filters, filtersLoadingStatus} = useSelector(state => state);
    const [activeFilter, setActiveFilter] = useState('all');
    const dispatch = useDispatch();

    const {request} = useHttp();

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))
        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const handler = (filter) => {
        setActiveFilter(filter)
        dispatch(chosenActiveFilter(filter))
    }

    const renderButtons = (arr) => {
        return arr.map((item, i) => {
            const active = activeFilter === item.name;
            const clazz = active ? 'btn active' : 'btn';
            return <button onClick={() => handler(item.name)} key={i} className={`${clazz} ${item.className}`}>{item.label}</button>
        })
    }

    const buttons = renderButtons(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {buttons}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;