import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

export function App () {

  
  
    return (
      <section className='App'>
      <TwitterFollowCard inicialisFollowing={true} userName="titicuevas"> 
      Enrique
      </TwitterFollowCard>
      
      <br />
      <TwitterFollowCard isFollowing userName="AgustinPedrote">
        Agustin
      </TwitterFollowCard>
      <br />
      <TwitterFollowCard isFollowing={false}  userName="antoniolc11">
        Antonio
      </TwitterFollowCard>
      
      </section>
    )
}
