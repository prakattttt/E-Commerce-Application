type Props = {
  message: string;
};

const Error = ({ message }: Props) => {
  return <p className="mt-2 text-sm text-red-500">{message}</p>;
};

export default Error;
