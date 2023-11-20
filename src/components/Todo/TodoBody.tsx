export default function TodoBody({ text }: { text: string }) {
  return (
    <>
      <div className="todo-content">
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </>
  );
}
