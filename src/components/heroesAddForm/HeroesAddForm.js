import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {useHttp} from '../../hooks/http.hook';

import { heroAdd } from '../../actions';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {

    const {filters, filtersLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [element, setElement] = useState('Я владею элементом...');

    const addNewHero = (e) => {
        e.preventDefault();

        const hero = {
                id: uuidv4(),
                name, 
                description: text, 
                element
            }

        dispatch(heroAdd(hero))

        /* request('http://localhost:3001/heroes/', "POST", JSON.stringify(hero))
        .catch(() => dispatch(heroesFetchingError())) */

        setName('');
        setText('');
        setElement('Я владею элементом...')
    }
    
    const renderOptions = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }

        const newArr = filters.slice(1, 5);
        return newArr.map((item, i) => {
            return <option key={i} value={item.name}>{item.label}</option>
        })
    }

    const options = renderOptions(filters, filtersLoadingStatus);

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={addNewHero}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name"
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={element} 
                    onChange={(e) => setElement(e.target.value)}>
                    <option value=''>Я владею элементом...</option>
                    {options}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;