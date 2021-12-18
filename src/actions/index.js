export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroDelete = (heroesWithoutOneHero) => {
    return {
        type: 'HERO_DELETE',
        newHeroes: heroesWithoutOneHero
    }
}

export const heroAdd = (newHero) => {
    return {
        type: 'HERO_ADD',
        newHero: newHero
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const chosenActiveFilter = (activeFilter) => {
    return {
        type: 'HERO_ACTIVEFILTER',
        activeFilter: activeFilter
    }
}