type EchoArgs = {
  str: string;
}

const echo = (parent: unknown, args: EchoArgs) => args.str;

export default echo;
