export function makeImagePath(id: string, format?: string) {
  if (id === "" || id === null || id === undefined) {
    return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAB+CAMAAADV/VW6AAAAWlBMVEX///8AAABxcXHMzMxiYmINDQ2mpqbi4uImJiZ0dHTQ0NCAgIDIyMj09PS8vLxTU1MTExNpaWk6OjqIiIigoKCxsbHCwsIhISFHR0dYWFiYmJjX19czMzN6enquttmqAAABMklEQVRoge3by26DMBCFYQ6BALmUNOk97fu/ZkWirgrV4LE7m/+swZ9AGnvjU1W/0+17pef0uJtZ056Dw77nwaEf3brk+P5tBv7UJfPD9H6bnLvfH1P52vX3fv7d2cVvvLyaWF6XWF5PsbyeY3m9xPJKGP+c/Ov68c/J6y2W13ssr69YXh+x/MrTPzu/brH8fHsN5fW5YvspwOts335K8Bpjefv4l+HN41+It57+pXgdYnnb6V+Oby3jV47XNpa3TJ+P7/7i6+J8db3Uw0yaf+IXsovlN/Dw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8NODvirtTMwXZW9V0LHJnHFadTDwOYqwC7FcEc9RA16IqZ/iL0EvxFZPcFbAF9Lv58oJ319+Ewj3NRwoAAAAAElFTkSuQmCC`;
  } else {
    return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
  }
}

export function NoSearchDataImage() {
  return `data:image/png;base64,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`;
}