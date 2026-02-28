import AvatarGroup from "./AvatarGroup";

const TeamCard = ({ team }) => {
  return (
    <div className="card border-0 bg-light p-3 h-100">
      <h5 className="fw-bold">{team.name}</h5>
      <p>{team.description}</p>

      <AvatarGroup members={team.members || []} />
    </div>
  );
};

export default TeamCard;
