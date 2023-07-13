import { pino } from 'pino';
// import pinoPretty from 'pino-pretty';

// const transport = pino.transport({
//   target: 'pino-pretty',
//   options: { destination: 1 } // use 2 for stderr
// })

const logger = pino();
export { logger };
