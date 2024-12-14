const clubs = [{
    name: 'Club 1',
    description: 'Description 1',
    members: ['Member 1', 'Member 2', 'Member 3'],
    events: ['Event 1', 'Event 2', 'Event 3']
}]

export function ClubList() {

    return (
        <div>
            {clubs.map((club) => (
                <div key={club.name}>
                    <h2>{club.name}</h2>
                    <p>{club.description}</p>
                    <ul>
                        {club.members.map((member) => (
                            <li key={member}>{member}</li>
                        ))}
                    </ul>
                    <ul>
                        {club.events.map((event) => (
                            <li key={event}>{event}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}