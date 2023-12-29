module.exports = () => {
  let initailTimer;

  let data = {
    status: true,
    timeTaken: 0,
    steps: [],
  };
  function setStatus(s) {
    data.status = s;
  }
  return {
    startTimer: () => {
      initailTimer = Date.now();
    },

    stopTimer: () => {
      data.timeTaken = Date.now() - initailTimer;
    },

    addStep: (step, status, logs = "") => {
      if (!status) setStatus(false);
      data.steps.push({
        step: step,
        status: status,
        logs: logs,
      });
    },

    getResult: () => {
      return data;
    },
  };
};
