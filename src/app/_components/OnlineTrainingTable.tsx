export default function OnlineTrainingTable() {
  return (
    <div className="">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Online</th>
              <th>In person</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>Flexibility</th>
              <td>
                <span className="text-primary">✔</span> Train from home, from
                gym, outise or indoor. Change your schedule with few clicks.
              </td>
              <td>
                <span className="text-red-500">✗</span> Restricted to gym and
                hired coaches availability. Inconvenient rescheduling and
                swapping coaches.
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>Costs</th>
              <td>
                <span className="text-primary">✔</span> Lower price due to
                buissness model.
              </td>
              <td>
                <span className="text-red-500">✗</span> Will always be more
                expensive
              </td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>Variety</th>
              <td>
                <span className="text-primary">✔</span> Pick activity and coach
                that matches your personal preferences.
              </td>
              <td>
                <span className="text-red-500">✗</span> Usually limited choice
                on site
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
