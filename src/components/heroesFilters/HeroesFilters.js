import { useState, useEffect } from 'react';

import {useHttp} from '../../hooks/http.hook';
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const [filters, setFilters] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');

    const {request} = useHttp();

    useEffect(() => {
        request("http://localhost:3001/filters")
            .then(data => setFilters(data))
        // eslint-disable-next-line
    }, []);

    const filtering = (items, filter) => {
        switch (filter) {
            case 'all': 
                return items
            case 'fire': 
                return items.filter(item => item.element)
            case 'water': 
                return items.filter(item => item.element)
            case 'wind': 
                return items.filter(item => item.element)
            case 'earth': 
                return items.filter(item => item.element)
            default: 
                return items
        }
    }

    const renderButtons = (arr) => {
        return arr.map((item, i) => {
            const active = activeFilter === item.name;
            const clazz = active ? 'btn active' : 'btn';
            return <button onClick={() => setActiveFilter(item.name)} key={i} className={`${clazz} ${item.className}`}>{item.label}</button>
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