import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    team: { type: String, required: true },
    zone: { type: String, required: true },
    img: { type: String, required: true },
    Classic: { type: String, required: true },
    Mantra: { type: String, required: true },
    naz: { type: String, required: true },
    piede: { type: String },
    paid: { type: Number, required: true },
    fantaTeam: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Teams' },
  },
  {
    timestamps: true,
  }
);

const teamsSchema = new mongoose.Schema
(
  {
    owner:
      {
        name: { type: String, required: true },
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
      },
    name: { type: String, required: true },
    players : 
      {
        goalkeepers: [ playerSchema ],
        defenders: 
          {
            dc: [ playerSchema ],
            dd: [ playerSchema ],
            ds: [ playerSchema ],
            e: [ playerSchema ],
          } || [ playerSchema ],
        midfielders:
          {
            m: [ playerSchema ],
            c: [ playerSchema ],
            tc: [ playerSchema ],
          } || [ playerSchema ],
        strikers:
          {
            w: [ playerSchema ],
            a: [ playerSchema ],
            pc: [ playerSchema ],
          } || [ playerSchema ],
      },
    creditTot: { type: Number, required: true },
    creditLeft: { type: Number, required: true },
  }
)

export const Teams = mongoose.model("Teams", teamsSchema);