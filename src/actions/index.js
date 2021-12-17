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

export const chosenActiveFilter = (activeFilter) => {
    return {
        type: 'HERO_ACTIVEFILTER',
        activeFilter: activeFilter
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}