const MountingComponent = (elm) => ({
  render: (html) => {
    document.getElementById(elm).innerHTML = html;
  },
  error: () => {
    document.getElementById(elm).innerHTML = `
    <div class="center">
    <h6>
    Sorry Something Wrong....
    </h6>
  </div>`;
  },
});

export default MountingComponent;
