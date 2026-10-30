export default function Developers() {
  const members = [
    {
      name: 'Bernardo F. Solero II',
      role: 'Creative Direction, UI/UX Design and Animation',
      contribution: 'Halloween concept, Canva layout, visual design and animation planning',
    },
    {
      name: 'Rojan Javier',
      role: 'Frontend Development',
      contribution: 'Task forms, React components and CRUD features',
    },
    {
      name: 'Esrihel Monares',
      role: 'Routing, Testing and Deployment',
      contribution: 'React Router, responsive testing, GitHub and Vercel',
    },
  ]

  return (
    <div className="page-inner">
      <h2 className="page-heading">Developers</h2>
      <p className="page-description">Our project team.</p>
      <div className="scroll-list">
        {members.map(member => (
          <div className="developer-card" key={member.name}>
            <strong>{member.name}</strong>
            <span>{member.role}</span>
            <small>{member.contribution}</small>
          </div>
        ))}
      </div>
    </div>
  )
}
