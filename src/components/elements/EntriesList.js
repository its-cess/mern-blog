import EntryItem from "./EntryItem";

const EntriesList = (props) => {

  return (
    <ul>
      {props.entries.map((entry) => (
        <EntryItem
          key={entry.id}
          id={entry.id}
          title={entry.title}
          body={entry.body}
          onDelete={props.onDeleteEntry}
        />
      ))}
    </ul>
  );
};

export default EntriesList;
