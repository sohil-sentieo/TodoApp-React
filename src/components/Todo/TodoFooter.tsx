import { formatDateToCustomFormat } from "../../util";

export default function TodoFooter({ date }: { date: Date }) {
  return (
    <>
      <div className="todo-footer">
        <div className="todo-date">
          Modified {formatDateToCustomFormat(date)}
        </div>
      </div>
    </>
  );
}
