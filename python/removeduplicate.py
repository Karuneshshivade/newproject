# Example array with duplicates
array = ["React","CSS","HTML","Angular","Bootstrap","JavaScript","Vue.js","Materialize","HTML","ReactNative","Expo","JavaScript","WordPress","PHP","HTML","Ember.js","CSS","HTML","React","Material-UI","JavaScript","Angular","Bootstrap","HTML","Vue.js","Vuetify","JavaScript","HTML","CSS","JS","React","CSS"]

# Convert the array to a set to remove duplicates, then back to a list
unique_array = list(set(array))

print(unique_array)  # Output: [1, 2, 3, 4, 5]
