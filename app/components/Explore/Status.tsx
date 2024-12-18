const Status = ({ status }: { status: string }) => {
  return (
    <div>
      <button className="whitespace-nowrap px-6 py-2.5 border border-dark-gray rounded-[3rem] text-center">
        {status}
      </button>
    </div>
  );
};

export default Status;
