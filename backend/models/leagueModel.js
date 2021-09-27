import mongoose from 'mongoose'

const configSchema = new mongoose.Schema
(
  {
    name: { type: String, required: true },
    playersMin: { type: Number, required: true },
    playersMax: { type: Number, required: true },
    teamsNumber: { type: Number, required: true },
    isMantra: { type: Boolean, required: true },
    isRandom: { type: Boolean, required: true },
    credits: { type: Number, required: true },
  },
)

const leagueSchema = new mongoose.Schema
(
  {
    config: configSchema,
    admins: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }  ],
    users: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }  ],
    teams: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Teams' }  ],
  },
  {
    timestamps: true,
  }
);

export const League = mongoose.model("Leagues", leagueSchema);
