

export function useTimer({ seconds, isActive, resolution = 1000 }) {

  const secondsLeft = ref(0);

  const formattedSecondsLeft = computed(() =>
    `${Math.floor(secondsLeft.value / 60).toString().padStart(2, '0')}:${(secondsLeft.value % 60).toString().padStart(2, '0')}`
  );

  const isFinished = computed(() =>
    secondsLeft.value <= 0
  );

  function restart() {
    setupTimer();
  }


  const _seconds = ref(seconds);
  const _isActive = ref(isActive);
  const _resolution = ref(resolution);
  let timerHandle = 0;

  watch(
    [_seconds, _isActive, _resolution],
    setupTimer,
    { immediate: true }
  );

  function setupTimer() {

    if (!_isActive.value) {
      secondsLeft.value = 0;
      return;
    }


    secondsLeft.value = _seconds.value;
    clearInterval(timerHandle);

    timerHandle = setInterval(() => {

      secondsLeft.value -= 1;

      if (secondsLeft.value <= 0) {
        clearInterval(timerHandle);
      }

    }, _resolution.value);

  }

  onUnmounted(() => {
    clearInterval(timerHandle);
  });


  return {
    secondsLeft,
    formattedSecondsLeft,
    isFinished,
    restart,
  };

}