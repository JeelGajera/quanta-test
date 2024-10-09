import { reactive, computed, watch } from "../../reactive-test/src/index";

export const Test = () => {
  // Create a reactive state
  const state = reactive({
    count: 0,
    nested: { value: 5 },
  });

  // Create a computed property
  const doubleCount = computed(() => state.count * 2);
  console.log(doubleCount.value); // 0

  state.count++;
  console.log(doubleCount.value); // 2

  // Watch for changes
  watch(
    () => state.nested.value,
    (newValue) => {
      console.log(`Nested value changed to: ${newValue}`);
    }
  );

  state.nested.value = 10; // Logs: "Nested value changed to: 10"
  state.nested.value = 10; // Logs: "Nested value changed to: 10"
  state.nested.value = 10; // Logs: "Nested value changed to: 10"
  state.nested.value = 10; // Logs: "Nested value changed to: 10"
  state.nested.value = 10; // Logs: "Nested value changed to: 10"
  state.nested.value = 10; // Logs: "Nested value changed to: 10"
  state.nested.value = 10; // Logs: "Nested value changed to: 10"
  state.nested.value = 10; // Logs: "Nested value changed to: 10"
  state.nested.value = 11; // Logs: "Nested value changed to: 10"
  state.count++;
  console.log(doubleCount.value); // 4
  state.count++;
  console.log(doubleCount.value); // 6
  state.count++;
  console.log(doubleCount.value); // 8
  state.count++;
  console.log(doubleCount.value); // 10
};
