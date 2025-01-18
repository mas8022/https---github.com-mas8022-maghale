"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const useOptimistic = (initialValue) => {
  const [state, setState] = useState(initialValue);
  const [isPending, setIsPending] = useState(false);
  const memoizedLastState = useRef(null);

  useEffect(() => setState(initialValue), [initialValue]);

  const executeAction = useCallback(
    async (action, setOptimisticState, setStateAfterAction) => {
      const optimisticState = setOptimisticState(state);
      memoizedLastState.current = state;

      setState(optimisticState);
      setIsPending(true);

      const actionResult = await action();

      const stateAfterAction = setStateAfterAction(
        memoizedLastState.current,
        actionResult
      );

      setState(stateAfterAction);
      setIsPending(false);
    },
    [state]
  );

  return [state, executeAction, isPending];
};

export default useOptimistic;
