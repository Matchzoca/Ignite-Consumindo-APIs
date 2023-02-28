import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import './filme-info.css';

import api from '../../Services/api';
import {toast} from 'react-toastify';

function Filme() {
    const{id} = useParams();
    const navigate = useNavigate;
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "5c1b8531f276c1b62621cf16a8b00816",
                    language: "pt-BR",
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);

            })
            .catch(()=> {
                navigate("/", {replace: true});
                return;
            })
        }

        loadFilme();

        return () => {

        }

    }, [navigate, id])

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@primeflix");

        let filmeSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmeSalvos.some((filmeSalvos) => filmeSalvos.id === filme.id);

        if (hasFilme) {
            toast.warn("ESSE FILME JÁ ESTÁ NA LISTA!");
            return;
        }

        filmeSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmeSalvos));
        toast.success("FILME SALVO COM SUCESSO!");
    }

    if (loading) {
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes......</h1>
            </div>
        )
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação:{filme.vote_average}</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    )
}

export default Filme;